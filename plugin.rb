# name: discourse-plugin-replygif
# about: Add ReplyGIF support
# version: 0.1
# authors: Matthew Wilkin
# url: https://github.com/cpradio/discourse-plugin-replygif

enabled_site_setting :replygif_enabled

register_asset "javascripts/discourse/templates/replygif.hbs"

register_asset 'stylesheets/replygif.scss'