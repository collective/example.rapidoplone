def update_searchabletext_field(context):
    transforms = context.api.portal.get_tool(name='portal_transforms')
    book = context.content
    back_cover_html = book.back_cover.output if book.back_cover else ""
    back_cover_plain = transforms.convertTo(
        'text/plain', back_cover_html, mimetype='text/html').getData()
    book.SearchableText = " ".join([
        book.title if book.title else "",
        book.authors if book.authors else "",
        str(book.year) if book.year else "",
        book.isbn_13 if book.isbn_13 else "",
        back_cover_plain
    ])
    book.reindexObject(idxs=['SearchableText'])