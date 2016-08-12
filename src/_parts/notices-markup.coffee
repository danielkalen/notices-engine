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
		<div class='notice'>
			<div class='notice-title'>{{title}}</div>
			<div class='notice-message'>{{text}}</div>
			<div class='notice-actions notice-actions--{{type}} _count--{{actionsCount}}'>{{actions}}</div>
			<div class='notice-altAction'>{{altAction}}</div>
		</div>
	"
	action: "
		<div class='notice-actions-item button_{{name}} {{promiseAction}}' data-name='{{name}}'>
			<div class='notice-actions-item-text'>{{label}}</div>
		</div>
	"