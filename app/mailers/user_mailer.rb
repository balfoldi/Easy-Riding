class UserMailer < ApplicationMailer
    default from: 'service@easy-riding.com'
  
    def welcome_email(user)
      @user = user
      @url  = 'http://www.easy-riding.com/' 
      mail(to: @user.email, subject: 'Bienvenue') 
    end
  
    def tenant_booking_email
    
    end

    def owner_booking_email
    
    end
    
  end   