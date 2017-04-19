def top(context):
    ''' This search method allows us to query our stored records.
    The record ids are the content paths, so using the Plone API
    (context.api), we can easily get the corresponding contents,
    and then obtain their URLs and titles. '''
    search = context.app.search("total>0", sort_index="total", reverse=True)[:5]
    html = "<ul>"
    for record in search:
        content = context.api.content.get(path=record["id"])
        html += '<li><a href="%s">%s</a> %d &#10084;</li>' % (
            content.absolute_url(),
            content.title,
            record["total"])
    html += "</ul>"
    return html