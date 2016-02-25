angular.module('alberti_web').service 'Mandrill', ($q, $http)->

  # Mailer Address

  urlBase = 'https://mandrillapp.com/api/1.0/messages/send.json'

  # Base Mailer Data

  baseMailer = {
    key: "PgQjPpxuJNhrw0CwSYjaVA",
    message: {
      from_email: "##EMAIL##"
      to: [
        {
          # email: "info@albertibusiness.com",
          email: "frenzi@koodit.it"
          name: "##FULL_NAME##"
          type: "to"
        }
      ]
      autotext: "true"
      subject: "Messaggio ricevuto da ##FULL_NAME## tramite sito."
      html: "##MESSAGE##" + '</br></br>' + "##FULL_NAME##"
    }
  }

  # SendMail Method

  this.sendMail = (contact_form_data) ->

    mail_to_send = baseMailer

    mail_to_send.message.from_email = contact_form_data.email
    mail_to_send.message.to[0].name = contact_form_data.full_name
    mail_to_send.message.subject = "Messaggio ricevuto da " + contact_form_data.full_name + " tramite sito."
    mail_to_send.message.html = contact_form_data.message + '</br></br>' + contact_form_data.full_name

    deferred = $q.defer()
    $http({
      url: urlBase
      method: 'POST'
      data: baseMailer
    })
    .then (data)->
      deferred.resolve(data)
    , (data) ->
      deferred.reject(data)

    deferred.promise

  this

