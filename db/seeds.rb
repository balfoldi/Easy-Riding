# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

if !Spec.last || ENV["specs"] === "true" || ENV["all"] === "true"
    Spec.delete_all
    require "csv"
    datas = CSV.read(Rails.root.join('db', 'assets', "Bike_data.csv"))[1..-1]
    datas.each do |data|
        rupy_price = data[3].split(" ")[1] #+ (data[3].split(" ")[3] === nil ? 0 : data[3].split(" ")[3])
        euro_price = rupy_price ? rupy_price.delete(",").to_f * 0.0112074.round(2) : rupy_price
        Spec.create(
            company_name: data[1], 
            model: data[2], 
            price: euro_price,
            status: data[4],
            body_type: data[5],
            fuel_type: data[6],
            displacement: data[7].split(" ")[0],
            maximum_power: data[8],
            maximum_torque: data[9],
            fuel_tank_capacity: data[10],
            number_of_gears: data[11],
            zero_to_100: data[12].split(" ")[0]
        )
        tp Spec.last
    end
end

if !Tag.last || ENV["tags"] === "true" || ENV["all"] === "true"
    Tag.destroy_all
    tag_names = ["commuting", "adventure", "touring", "harley-boy", "everyday", "track", "highway", "666", "wheely", "safe", "heritage", "sport", "collection", "hard_to_ride", "easy_to_ride"]
    tag_names.each do |tag_name|
        Tag.create( name: tag_name, color: Faker::Color.hex_color )
    end
end

if !User.last || ENV["users"] === "true" || ENV["all"] === "true"
    10.times do
    User.delete_all
        User.create( 
            first_name: Faker::Name.first_name, 
            last_name: Faker::Name.last_name, 
            email: Faker::Internet.email,
            username: Faker::Books::Dune.character[0], 
            phone_number: Faker::PhoneNumber.phone_number, 
            password: 123123, 
            description: Faker::Hipster.paragraph(sentence_count: 10)
        )
        tp User.last
    end
end

if !Bike.last || ENV["bikes"] === "true" || ENV["all"] === "true"
    Bike.delete_all
    10.times do
        Bike.create( 
            owner: User.all.sample,
            spec: Spec.all.sample, 
            description: Faker::Movies::StarWars.quote,
            tags: Tag.all.sample(rand(1..3))
            )
        tp Bike.last
    end
end

if !Offer.last || ENV["offers"] === "true" || ENV["all"] === "true"
    Offer.delete_all
    Bike.all.first(5).each do |bike|
        zip_code=""
        5.times { zip_code += rand(9).to_s}
        Offer.create(
            title: "#{Faker::Hipster.word} #{bike.spec.model}",
            description: Faker::Hipster.paragraph(sentence_count: 10),
            daily_price: bike.spec.price ?  bike.spec.price/150.round : 100,
            start_date: Date.new,
            end_date: Date.new + 5,
            city: Faker::Address.city,
            zip_code: zip_code,
            street: Faker::Address.street_name,
            bike: bike
        )
        tp Offer.last
    end
end

if !Booking.last || ENV["bikes"] === "true" || ENV["all"] === "true"
    Booking.delete_all
    5.times do 
        Booking.create(
            start_date: Date.new + 1,
            end_date: Date.new + rand(1..3),
            tenant: User.all.sample,
            offer: Offer.all.sample
        )
        tp Booking.last
    end
end