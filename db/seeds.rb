require 'faker'

regions = ["Auvergne-Rhône-Alpes","Bourgogne-Franche-Comté","Bretagne","Centre-Val de Loire","Corse","Grand Est","Hauts-de-France","Île-de-France","Normandie","Nouvelle-Aquitaine","Occitanie","Pays de la Loire","Provence-Alpes-Côte d'Azur"]


if !User.last || ENV["users"] === "true" || ENV["all"] === "true"
    User.delete_all
    10.times do
        first_name = Faker::Name.first_name
        last_name = Faker::Name.last_name
        User.create(
            first_name: first_name,
            last_name: last_name,
            email: "#{first_name}#{last_name}@yopmail.com",
            username: Faker::Books::Dune.character,
            phone_number: Faker::PhoneNumber.phone_number,
            password: 123123,
            description: Faker::Lorem.paragraph(sentence_count: 10)
        )
    end
    puts "Users done"
end

companies = [
  "BMW",
  "Honda",
  "Kawasaki",
  "Suzuki",
  "Harley Davidson"
]

models = [
  "S 1000",
  "CB 500",
  "KXF 250",
  "SV 650",
  "Iron 883"
]


if !Bike.last || ENV["bikes"] === "true" || ENV["all"] === "true"
    Bike.delete_all
    all_images = Dir.entries("db/assets/images/motor_bike_pics").select { |f| File.file? File.join("db/assets/images/motor_bike_pics", f) }
    regions.each do
        10.times do
            bike = Bike.new(
                kilometrage: rand(20000),
                owner: User.all.sample,
                description: Faker::Movies::StarWars.quote,
                model: companies.sample,
                company_name: models.sample,
                body_type: "2 wheels",
                maximum_power: "100 hp",
                maximum_torque: "20 Nm",
                zero_to_100: "4 sec"
            )
            images = all_images.sample(3)
            images.each do |image|
                bike.pictures.attach(io: File.open(Rails.root.join('db', 'assets', 'images', 'motor_bike_pics', image)), filename: image, content_type: 'image/jpg')
            end

            unless bike.save
                puts bike.errors.messages
            end
        end
    end
    puts "Bikes done"
end


if !Offer.last || ENV["offers"] === "true" || ENV["all"] === "true"
    descriptions = File.open("db/assets/texts/location_motos.txt", mode: "r").read.split("/")
    Offer.delete_all
    Bike.all.each do |bike|
        zip_code=""
        5.times { zip_code += rand(9).to_s}
        offer = Offer.new(
            title: "#{Faker::Lorem.word}",
            description: descriptions.sample,
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
    puts "Offers done"
end


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
    puts "Bookings done"
end

