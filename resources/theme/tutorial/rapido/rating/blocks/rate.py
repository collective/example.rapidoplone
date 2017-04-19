def like(context):
    ''' This function let to a user clicks on the “Like” button,
    we need to get the current content the user voted for, check
    how many votes it already has, and add one new vote.'''
    content_path = context.content.absolute_url_path()
    record = context.app.get_record(content_path)
    if not record:
        record = context.app.create_record(id=content_path)
    total = record.get('total', 0)
    total += 1
    record['total'] = total
    record.save(block_id='rate')
    record.reindex()

def display(context):
    ''' This function to display the total of votes. '''
    content_path = context.content.absolute_url_path()
    record = context.app.get_record(content_path)
    if not record:
        return ''
    context.app.log(record.items())
    return "&#10084;" * record.get('total', 0)
