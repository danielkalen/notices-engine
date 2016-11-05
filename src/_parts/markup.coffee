markup = 
	container: ()->
		"<div class='NoticeContainer'></div>"
	
	overlay: ()->
		"<div class='NoticeContainer-overlay'></div>"

	notice: ()->
		"<div class='Notice'></div>"

	title: ({title})->
		"<div class='Notice-title'>#{title}</div>"

	text: ({text})->
		"<div class='Notice-text'>#{text}</div>"

	actions: ({type})->
		"<div class='Notice-actions Notice-actions--#{type}'></div>"

	altAction: ({altAction})->
		"<div class='Notice-altAction'>#{altAction}</div>"

	actionButton: ({name})->
		"<div class='Notice-actions-item button_#{name}' data-name='#{name}'></div>"

	actionButtonLabel: ({label})->
		"<div class='Notice-actions-item-text'>#{label}</div>"





