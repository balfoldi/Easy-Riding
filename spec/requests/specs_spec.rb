require 'rails_helper'

RSpec.describe "Specs", type: :request do
  describe "GET /specs" do
    it "works! (now write some real specs)" do
      get specs_path
      expect(response).to have_http_status(200)
    end
  end
end
