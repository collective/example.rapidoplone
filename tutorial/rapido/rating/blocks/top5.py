def top(context):
    search = context.app.search("total>0", sort_index="total", reverse=True)[:5]
    html = "<ul>"
    for record in search:
        content = context.api.content.get(path=record["id"])
        html += '<li><a href="%s">%s</a> %d ❤</li>' % (
            content.absolute_url(),
            content.title,
            record["total"]) 
    html += "</ul>"
    return html
