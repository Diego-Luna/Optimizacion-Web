const h = require('hyperscript')

const Controls = ({ source }) =>
  h(
    'div',
    h(
      'a.js-modal',
      {
        href: `${source}`,
        'data-videoid': source,
        title: 'Watch trailer',
        target: '_blank',
        rel: 'noreferrer',
      },
      h('img.carousel-item__details--img', {
        src: 'assets/play-icon.png',
        alt: 'Play',
      })
    )
  )

const CarouselItem = ({ imageUrl, title, subtitle, source, year }) =>
  h(
    'div.carousel-item',
    h('img.carousel-item__img', {
      alt: title,
      'data-src': imageUrl,
      'data-background-image': '/assets/carousel-item-placeholder.png',
    }),
    h(
      'div.carousel-item__details',
      Controls({ source }),
      h('p.carousel-item__details--title', title),
      h('p.carousel-item__details--subtitle', subtitle),
      h('p.carousel-item__details--date', `Released: ${year}`)
    )
  )

module.exports = CarouselItem
