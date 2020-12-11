# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_09_164927) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bikes", force: :cascade do |t|
    t.text "description"
    t.bigint "owner_id"
    t.bigint "spec_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["owner_id"], name: "index_bikes_on_owner_id"
    t.index ["spec_id"], name: "index_bikes_on_spec_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.bigint "tenant_id"
    t.bigint "offer_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["offer_id"], name: "index_bookings_on_offer_id"
    t.index ["tenant_id"], name: "index_bookings_on_tenant_id"
  end

  create_table "join_table_bikes_tags", force: :cascade do |t|
    t.bigint "bike_id"
    t.bigint "tag_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bike_id"], name: "index_join_table_bikes_tags_on_bike_id"
    t.index ["tag_id"], name: "index_join_table_bikes_tags_on_tag_id"
  end

  create_table "join_table_favorites_offers", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "offer_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["offer_id"], name: "index_join_table_favorites_offers_on_offer_id"
    t.index ["user_id"], name: "index_join_table_favorites_offers_on_user_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "offers", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "daily_price"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string "city"
    t.string "zip_code"
    t.string "street"
    t.string "region"
    t.bigint "bike_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bike_id"], name: "index_offers_on_bike_id"
  end

  create_table "specs", force: :cascade do |t|
    t.string "company_name"
    t.string "model"
    t.float "price"
    t.string "status"
    t.string "body_type"
    t.string "fuel_type"
    t.integer "displacement"
    t.string "maximum_power"
    t.string "maximum_torque"
    t.string "fuel_tank_capacity"
    t.string "number_of_gears"
    t.float "zero_to_100"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "phone_number"
    t.string "password"
    t.string "description"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
