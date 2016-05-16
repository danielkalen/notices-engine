###*
# The library I authored for use as subnotices/alerts sitewide (frontend/backend)
###

do ($ = jQuery)->
	if $('.subnotices').length is 0
		$('body').prepend('<div class="subnotices"></div>')

	@subnotify = ({type='info', text='', time=10000, title='', browserNotice=false, container})->
		markup = "<div class='subnotice subnotice_#{type}'>
					<div class='subnotice-text'>#{text}</div>
					<div class='subnotice-close'></div>
				 </div>"
		
		subnoticeObject = new Subnotice(markup, container)
		subnoticeObject.destroy(time)

		if browserNotice
			new BrowserNotice {title, text}

		return subnoticeObject

	
	Subnotice = (markup, container)->
		@el = $(markup)
		@el.data('Subnotice', @)
		@wrapperEl = container or $('.subnotices').first()
		@isActive = true

		if not @wrapperEl.hasClass('subnotices')
			@wrapperEl.find('.subnotices').first()
		@append()
		@attachEvents()
		return @


	Subnotice::append = ()->
		@el.prependTo @wrapperEl

		setTimeout ()=>
			@reveal()
		, 200

	
	Subnotice::reveal = ()-> @el.addClass('show')
	
	
	Subnotice::attachEvents = ()-> @el.children('.subnotice-close').on 'click', ()=> @destroy(0)
	

	Subnotice::destroy = (time)->
		if time isnt false
			el = @el
			setTimeout ()=>
				@el.removeClass('show')
				@el.remove()
				@isActive = false				
			, time




	BrowserNotice = ({@title, @text})->
		return @ unless Notification?
		if Notification.permission is 'granted'
			@reveal()
		else
			Notification.requestPermission().then (state)=> @reveal() unless state isnt 'granted'

	BrowserNotice::reveal = ()->
		@notice = new Notification(@title, {'body':@text})





	$(window).on 'click', '.subnotice-close', ()->
		subnoticeObject = $(@).parent().data('Subnotice')
		subnoticeObject.destroy(0)


	return
