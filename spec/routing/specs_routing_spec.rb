require "rails_helper"

RSpec.describe SpecsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/specs").to route_to("specs#index")
    end

    it "routes to #show" do
      expect(:get => "/specs/1").to route_to("specs#show", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/specs").to route_to("specs#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/specs/1").to route_to("specs#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/specs/1").to route_to("specs#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/specs/1").to route_to("specs#destroy", :id => "1")
    end
  end
end
