genActionButtons = (buttons, resolver, rejecter)->
	markup = for name,label of buttons
		noticeMarkup.action
			.replace '{{name}}', name
			.replace '{{name}}', name
			.replace '{{label}}', label
			.replace '{{promiseAction}}', switch
				when name is resolver then '_resolver'
				when name is rejecter then '_rejecter'
				else ''

	markup.join ''



noticeMarkup =
	notice:"
		<div class='Notice'>
			<div class='Notice-title'>{{title}}</div>
			<div class='Notice-message'>{{text}}</div>
			<div class='Notice-actions Notice-actions--{{type}} _count--{{actionsCount}}'>{{actions}}</div>
			<div class='Notice-altAction'>{{altAction}}</div>
		</div>
	"
	action: "
		<div class='Notice-actions-item button_{{name}} {{promiseAction}}' data-name='{{name}}'>
			<div class='Notice-actions-item-text'>{{label}}</div>
		</div>
	"