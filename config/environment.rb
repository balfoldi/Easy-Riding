# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
    :user_name => ENV['MAILER_LOGIN'],
    :password => ENV['MAILER_PWD'],
    :domain => 'alfoldievaluation.com',
    :address => 'smtp-relay.sendinblue.com',
    :port => 587,
    :authentication => :plain,
    :enable_starttls_auto => true
  }