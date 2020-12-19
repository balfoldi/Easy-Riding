FactoryBot.define do
  factory :offer do
    title { "MyString" }
    description { "MyText" }
    daily_price { 1 }
    start_date { "2020-12-08 21:25:58" }
    end_date { "2020-12-08 21:25:58" }
    city { "MyString" }
    zip_code { 1 }
    street { "MyString" }
  end
end
