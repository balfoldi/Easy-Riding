class UpdateUser < ActiveRecord::Migration[6.0]
  def change
    add_column  :users, :first_name, :string
    add_column  :users, :last_name, :string
    add_column  :users, :username, :string
    add_column  :users, :phone_number, :string
    add_column  :users, :password, :string
    add_column  :users, :avatar, :string
    add_column  :users, :description, :string
  end
end
