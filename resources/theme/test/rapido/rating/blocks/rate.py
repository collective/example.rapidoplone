def like(context):
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
    content_path = context.content.absolute_url_path()
    record = context.app.get_record(content_path)
    if not record:
        return ''
    context.app.log(record.items())
    return "&#10084;" * record.get('total', 0)
