class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :kitchen_id, null: false

      t.timestamps
    end

    add_index :favorites, [:user_id, :kitchen_id], unique: true
  end
end
