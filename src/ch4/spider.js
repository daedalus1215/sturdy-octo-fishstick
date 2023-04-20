function spiderLinks(currentUrl, body, nesting, queue) {
    if (nesting === 0) {
        return
    }
    const links = getPageLinks(currentUrl, body)
    if (links.length === 0) {
        return
    }
    links.forEach(link => spider(link, nesting - 1, queue))
}

const spidering = new Set()
export function spider(url, nesting, queue) {
    if (spidering.has(url)) {
        return
    }
    spidering.add(url)
    queue.pushTask((done) => {
        spiderTask(url, nesting, queue, done)
    })
}