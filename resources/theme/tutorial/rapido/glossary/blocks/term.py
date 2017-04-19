def close(context):
	''' This is action form allowing to close a glossary term.
	If we click on this action in this block, we want to be
	redirected to the main management page. '''
    return context.app.get_block('all').url

def on_save(context):
	''' This is action form form allowing to edit and save a
	glossary term. If we click on this action in this block,
	we want to be redirected to the main management page. '''
    return context.app.get_block('all').url

def on_delete(context):
	''' This is action form allowing to delete a glossary term.
	If we click on this action in this block, we want to be
	redirected to the main management page. '''
    return context.app.get_block('all').url