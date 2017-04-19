def list(context):
	''' The list function builds a table row for each existing record,
	displaying the term value and the definition value. The link we put
	on the term targets the record URL (plus /edit to open it in edit mode)
	and we have added target=”ajax” so the resulting page is not displayed
	as a full page, it is just loaded into the current block in AJAX mode.
    '''
    html = u""
    for record in context.app.records():
        html += """<tr><td><a href="%s/edit" target="ajax">%s</a></td><td>%s</td></tr>""" % (
            record.url,
            record['term'],
            record['definition'],
        )
    return html

def new_term(context):
	''' The list function let you opening a blank term block to create a new term. '''
    return context.app.get_block('term').url