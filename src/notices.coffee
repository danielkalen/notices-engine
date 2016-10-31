do ($=jQuery)->	
	notify = ({template, type='ok', title='', text='', buttons={}, altAction='', resolver, rejecter, context=notify.context})->
		type = type.replace '_', ''
		extraActionsClass = if type is 'yesno' then ' Notice-actions_yesno' else ''

		if template 
			markup = template
		else
			markup = noticeMarkup.notice
				.replace '{{title}}', title
				.replace '{{text}}', text
				.replace '{{type}}', type
				.replace '{{altAction}}', altAction
				.replace '{{actionsCount}}', switch type
					when 'ok' then 1
					when 'yesno' then 2
					else (p for p of buttons).length
				
				.replace '{{actions}}', ()->
					switch type
						when 'ok' 
							actions = {ok:'OK'}
							resolver = 'ok'
						when 'yesno' 
							actions = {no:'No', yes:'Yes'}
							rejecter = 'no'
							resolver = 'yes'
						when 'custom' 
							actions = buttons

					return genActionButtons(actions, resolver, rejecter)

		new Notice({markup, type, context})









	import '_parts/notices-Notice.coffee'
	import '_parts/notices-markup.coffee'
	import '_parts/notices-defaults.coffee'

	window.notify = notify
	notify.Notice = Notice
