class UserMailer < ApplicationMailer
    default from: 'service@easy-riding.com'
  
    def welcome_email(user)
      @user = user
      @url  = 'http://www.easy-riding.com/' 
      mail(to: @user.email, subject: 'Bienvenue') 
    end
  
    def tenant_booking_email(booking)
      @owner = booking.offer.bike.owner
      @tenant = booking.tenant
      @bike = booking.offer.bike
      @start_date = booking.start_date
      @offer = booking.offer
      mail(to: @tenant.email, subject: 'Réservation acceptée')     
    end
    
    def owner_booking_email(booking)
      @owner = booking.offer.bike.owner
      @tenant = booking.tenant
      @bike = booking.offer.bike
      @start_date = booking.start_date
      @offer = booking.offer
      mail(to: @owner.email, subject: 'Réservation acceptée') 
    end

  end   