do ($=jQuery)->	
	import '_parts/styles.coffee'
	import '_parts/markup.coffee'
	import '_parts/helpers.coffee'


	Notice = ({@type='ok', @title='', @text='', @actions, @altAction='', @highlight})->
		@isActive = false
		@els = {}
		@els.actionButtons = {}
		@els.container = $(markup.container())
		@els.overlay = $(markup.overlay()).appendTo(@els.container)
		@els.notice = $(markup.notice()).appendTo(@els.container).data 'Notice', @
		@els.title = $(markup.title {@title}).appendTo(@els.notice)
		@els.text = $(markup.text {@text}).appendTo(@els.notice)
		@els.actions = $(markup.actions {@type}).appendTo(@els.notice)
		@els.altAction = $(markup.altAction {@altAction}).appendTo(@els.notice)

		switch @type
			when 'ok'
				@actions = {ok:'OK'}
				@highlight = 'ok'

			when 'yesno'
				@actions = {no:'No', yes:'Yes'}
				@highlight = 'yes'

			else @type = 'custom'


		for name,label of @actions
			@els.actionButtons[name] = $(markup.actionButton {name}).appendTo(@els.actions)
			@els.actionButtons[name].append $(markup.actionButtonLabel {label})


		@actionsCount = (p for p of @actions).length
		@appendToContainer()
		return @



	Notice::appendToContainer = ()->
		applyStyles(@els.container, Notice.style.container())
		applyStyles(@els.overlay, Notice.style.overlay())
		applyStyles(@els.notice, Notice.style.notice())
		applyStyles(@els.title, Notice.style.title())
		applyStyles(@els.text, Notice.style.text())
		applyStyles(@els.actions, Notice.style.actions())
		applyStyles(@els.altAction, Notice.style.altAction())
		applyStyles(@els.altAction, if @altAction then Notice.style.altAction() else display:'none')

		for name,actionEl of @els.actionButtons
			applyStyles(actionEl, Notice.style.actionButton(@actionsCount))
			applyStyles(actionEl, Notice.style.actionButtonHighlight()) if name is @highlight
			applyStyles(actionEl.children(), Notice.style.actionButtonText())

		removeStyles(@els.actionButtons[Object.keys(@els.actionButtons).slice(-1)[0]], {borderRight:''})

		@els.container.appendTo(Notice.context)


	Notice::prompt = ()-> @promise = new Promise (resolve)=>
		@reveal()

		for name,actionEl of @els.actionButtons then do (name,actionEl)=>
			actionEl.on Notice.clickEvent, ()=>
				@dismiss(name).then(resolve)
		
		@els.altAction.on Notice.clickEvent, ()=>
			@dismiss('altAction').then(resolve)



	Notice::dismiss = (targetAction)-> new Promise (resolve)=>
		Notice.queue.splice Notice.queue.indexOf(@),1
		applyStyles(@els.container, Notice.style.container())
		applyStyles(@els.overlay, Notice.style.overlay())
		applyStyles(@els.notice, Notice.style.notice())

		setTimeout ()=>
			@destroy()
			resolve(targetAction)
		, 350



	Notice::reveal = ()->
		Notice.queue.push(@)
		index = Notice.queue.indexOf(@)
		
		if Notice.queue.slice(0,index).length
			noticeInFront = Notice.queue.slice(-2)[0].promise
		else
			noticeInFront = Promise.resolve()
		
		noticeInFront.then ()=> setTimeout ()=>
			applyStyles(@els.container, Notice.styleOpenState.container())
			applyStyles(@els.overlay, Notice.styleOpenState.overlay())
			applyStyles(@els.notice, Notice.styleOpenState.notice())
		, 100



	Notice::destroy = ()->
		@els.notice.remove()
		@isActive = false






	Notice.version = import '../.version.coffee'
	Notice.queue = []
	Notice.clickEvent = 'click'
	Notice.markup = markup
	Notice.style = style
	Notice.styleOpenState = styleOpenState
	Notice.colorBorder = '#c7c7c7'
	Notice.colorButton = '#f1c618'
	Notice.colorAltAction = '#ffffff'
	Notice.colorText = '#181818'
	Notice.context = document.body

	window.Notice = Notice