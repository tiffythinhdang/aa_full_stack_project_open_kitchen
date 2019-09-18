class Api::ReviewsController < ApplicationController
  before_action :ensure_log_in, only: [:create, :update, :destroy]

  def index
    @kitchen = Kitchen.find_by(id: params[:kitchen_id])
    @reviews = @kitchen.reviews
    @users = @reviews.map do |review|
      User.find_by(id: review.user_id)
    end

    render :index
  end

  def create
    @review = current_user.reviews.new(review_params)
    @user = current_user
    kitchen_id = review_params[:kitchen_id]

    ActiveRecord::Base.transaction do
      if @review.save
        Kitchen.increase_num_reviews(kitchen_id)
        Kitchen.recalculate_avg_rating(kitchen_id, "create", @review.rating)
        render :show
      else
        render json: @review.errors.full_messages, status: 422
      end
    end
  end

  def update
    @review = Review.find_by(id: params[:id])
    @user = current_user
    kitchen_id = review_params[:kitchen_id]
    old_rating = @review.rating

    ActiveRecord::Base.transaction do
      if @review.update(review_params)
        Kitchen.recalculate_avg_rating(kitchen_id, "update", @review.rating, old_rating)
        render :show
      else
        render json: @review.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    @review = Review.find_by(id: params[:id])
    kitchen_id = review_params[:kitchen_id]
    rating = @review.rating

    ActiveRecord::Base.transaction do
      if @review.user_id == current_user.id
        @review.destroy
        Kitchen.decrease_num_reviews(kitchen_id)
        Kitchen.recalculate_avg_rating(kitchen_id, "destroy", @review.rating)
        render json: @review
      else
        render json: ["Cannot delete comment that are not yours!"]
      end
    end
  end

  private

  def review_params
    params.require(:review).permit(:rating, :body, :kitchen_id)
  end
end
