Notice = ({markup, @type, context})->
	@el$ = $(markup)
	@isActive = true
	@wrapper$ = @appendContainer(context)
	
	@allInstances.push(@)
	@el$.data 'Notice', @
	return @prompt()




Notice::appendContainer = (context)->
	if $(".Notices", context).length
		$(".Notices", context)
	else
		$("<div class='Notices'></div>").appendTo(context)


Notice::append = ()->
	append = ()=> @el$.appendTo(@wrapper$)
	index = @allInstances.indexOf(@)

	if @allInstances.slice(0,index).length
		noticeInFront = @allInstances.slice(-2)[0].promise
	else
		noticeInFront = Promise.resolve()
	
	noticeInFront.then append, append



Notice::remove = ()->
	@el$.remove()
	@isActive = false



Notice::reveal = ()->
	setTimeout ()=>
		@wrapper$.addClass('reveal')
	, 50



Notice::dismiss = ()->
	@allInstances.splice @allInstances.indexOf(@),1
	@wrapper$.removeClass('reveal') unless @allInstances.length
	
	setTimeout ()=>
		@remove()
	, 400


Notice::prompt = ()-> @promise = new Promise (resolve, reject)=>
	@append()
	@reveal()

	@el$.on notify.clickEvent, '.Notice-actions-item', ()=> @dismiss()
	@el$.on notify.clickEvent, '._resolver', ()=> resolve(@)
	@el$.on notify.clickEvent, '._rejecter', ()=> reject(@)
	@el$.on notify.clickEvent, '.Notice-altAction', ()=>
		@dismiss()
		reject(@)



Notice::allInstances = []




