require 'faker'

if !Spec.last || ENV["specs"] === "true" || ENV["all"] === "true"
    Spec.delete_all
    require "csv"
    datas = CSV.read(Rails.root.join('db', 'assets', "csv", "Bike_data.csv"))[1..-1]
    datas.each do |data|

        Spec.create(
            model: data[2],
            company_name: data[1],
            body_type: data[5],
            maximum_power: data[11] === "NaN" ? "" : data[11],
            maximum_torque: data[12] === "NaN" ? "" : data[12],
            zero_to_100: data[31] === "NaN" ? "" : data[31],
            displacement: data[10] === "NaN" ? "" : data[10]
        )
    end
end

puts "Specs done"

if !Tag.last || ENV["tags"] === "true" || ENV["all"] === "true"
    Tag.destroy_all
    tag_names = ["commuting", "adventure", "touring", "harley-boy", "everyday", "track", "highway", "666", "wheely", "safe", "heritage", "sport", "collection", "hard_to_ride", "easy_to_ride"]
    tag_names.each do |tag_name|
        Tag.create( name: tag_name, color: Faker::Color.hex_color )
    end
end

puts "Tags done"

if !User.last || ENV["users"] === "true" || ENV["all"] === "true"
    User.delete_all
    10.times do
        User.create(
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            email: Faker::Internet.email,
            username: Faker::Books::Dune.character[0],
            phone_number: Faker::PhoneNumber.phone_number,
            password: 123123,
            description: Faker::Hipster.paragraph(sentence_count: 10)
        )
    end
end

puts "Users done"

if !Bike.last || ENV["bikes"] === "true" || ENV["all"] === "true"
    Bike.delete_all
    3.times do
        spec = Spec.all.sample
        Bike.create( 
            kilometrage: rand(20000),
            owner: User.all.sample,
            description: Faker::Movies::StarWars.quote,
            tags: Tag.all.sample(rand(1..3)),
            model: spec.model,
            company_name: spec.company_name,
            body_type: spec.body_type,
            maximum_power: spec.maximum_power,
            maximum_torque: spec.maximum_torque,
            zero_to_100: spec.zero_to_100
        )
        image = "default_bike_picture.jpg"
        3.times do
            Bike.last.pictures.attach(io: File.open(Rails.root.join('db', 'assets', 'images', image)), filename: image, content_type: 'image/jpg')
        end 
        tp Bike.last
    end
end

puts "Bikes done"

if !Offer.last || ENV["offers"] === "true" || ENV["all"] === "true"
    Offer.delete_all
    regions = ["Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Bretagne","Centre-Val de Loire","Corse","Grand Est","Hauts-de-France","Île-de-France","Normandie","Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur"]
    Bike.all.first(5).each do |bike|
        zip_code=""
        5.times { zip_code += rand(9).to_s}
        offer = Offer.new(
            title: "#{Faker::Hipster.word} #{Spec.all.sample.model}",
            description: Faker::Hipster.paragraph(sentence_count: 10),
            daily_price: rand(20..300),
            start_date: Date.today,
            end_date: Date.today + rand(5),
            city: Faker::Address.city,
            zip_code: zip_code,
            street: Faker::Address.street_name,
            region: regions.sample,
            bike: bike,
            users: User.all.sample(3)
        )
        if !offer.save
            puts offer.errors.messages
        end
    end
end

puts "Offers done"

if !Booking.last || ENV["bikes"] === "true" || ENV["all"] === "true"
    Booking.delete_all
    5.times do
        booking = Booking.new(
            start_date: Date.today,
            end_date: Date.today + rand(5),
            tenant: User.all.sample,
            offer: Offer.all.sample
        )
        if !booking.save
            puts booking.errors.messages
        end
    end
end

puts "Bookings done"
