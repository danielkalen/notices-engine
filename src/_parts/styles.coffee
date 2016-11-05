style = 
	container: ()->
		position: 'absolute'
		zIndex: '10000'
		top: '0'
		left: '0'
		width: '100vw'
		height: '100vh'
		visibility: 'hidden'

	overlay: ()->
		position: 'fixed'
		zIndex: '1'
		left: '0'
		top: '0'
		width: '100vw'
		height: '100vh'
		backgroundColor: 'rgba(0,0,0,0.5)'
		opacity: 0
		transition: 'opacity 0.3s'

	notice: ()->
		position: 'absolute'
		zIndex: '2'
		top: '50%'
		left: 0
		right: 0
		width: '90%'
		maxWidth: '350px'
		margin: '0 auto'
		backgroundColor: 'white'
		borderRadius: '3px'
		boxShadow: '0px 5px 11px rgba(0,0,0,0.4)'
		boxSizing: 'border-box'
		textAlign: 'center'
		opacity: 0
		webkitTransformOrigin: '50% 35%'
		mozTransformOrigin: '50% 35%'
		msTransformOrigin: '50% 35%'
		oTransformOrigin: '50% 35%'
		transformOrigin: '50% 35%'
		webkitTransform: 'scale(0.85) translateY(-50%)'
		mozTransform: 'scale(0.85) translateY(-50%)'
		msTransform: 'scale(0.85) translateY(-50%)'
		oTransform: 'scale(0.85) translateY(-50%)'
		transform: 'scale(0.85) translateY(-50%)'
		transition: 'transform 0.3s, opacity 0.3s'

	title: ()->
		paddingTop: '22px'
		fontSize: '23px'
		fontWeight: '600'
		lineHeight: '1'
		color: Notice.colorText

	text: ()->
		maxWidth: '80%'
		margin: '0 auto'
		padding: '8px 0 22px'
		fontSize: '14.5px'
		fontWeight: '500'
		lineHeight: '1.2'
		color: Notice.colorText

	actions: ()->
		position: 'relative'
		overflow: 'hidden'
		# display: 'table'
		height: '45px'
		borderTop: "1px solid #{Notice.colorBorder}"
		borderRadius: '0 0 3px 3px'
		fontSize: '14.5px'
		fontWeight: '500'
		lineHeight: '1.2'

	actionButton: (actionsCount)->
		position: 'relative'
		float: 'left'
		width: "#{100/actionsCount}%"
		height: '100%'
		borderRight: "1px solid #{Notice.colorBorder}"
		boxSizing: 'border-box'
		fontSize: '18px'
		fontWeight: '400'
		lineHeight: '1'
		letterSpacing: '0.45px'
		textTransform: 'uppercase'
		cursor: 'pointer'
		color: Notice.colorButton

	actionButtonHighlight: ()->
		fontWeight: '600'
	
	actionButtonText: ()->
		position: 'absolute'
		top: '50%'
		left: '0'
		right: '0'
		width: '100%'
		textAlign: 'center'
		webkitTransform: 'translateY(-50%)'
		mozTransform: 'translateY(-50%)'
		msTransform: 'translateY(-50%)'
		oTransform: 'translateY(-50%)'
		transform: 'translateY(-50%)'
	
	altAction: ()->
		position: 'absolute'
		bottom: '-50%'
		left: '0'
		right: '0'
		fontSize: '13px'
		color: Notice.colorAltAction
		opacity: 0.7







styleOpenState =
	container: ()->
		visibility: 'visible'
	
	overlay: ()->
		opacity: '1'

	notice: ()->
		opacity: '1'
		visibility: 'visible'
		webkitTransform: 'scale(1) translateY(-50%)'
		mozTransform: 'scale(1) translateY(-50%)'
		msTransform: 'scale(1) translateY(-50%)'
		oTransform: 'scale(1) translateY(-50%)'
		transform: 'scale(1) translateY(-50%)'




