const h = require('hyperscript')
const { fetchPopular } = require('./api')
const CarouselItem = require('./CarouselItem')

/**
 * Render home contents
 * @return {Promise<string>}
 */
async function render() {
  const [popular] = await Promise.all([fetchPopular()])

  const html = h(
    'section',
    SectionTitle('Most Popular'),
    Carousel({
      itemsList: popular,
    })
  )

  const htmlText = html.innerHTML

  return htmlText
}

const SectionTitle = title => h('h3.carousel__title', title)

const Carousel = ({ itemsList }) =>
  h(
    'section.carousel',
    h(
      'div.carousel__container',
      itemsList.map(({ title, cover, description, source, year }) =>
        CarouselItem({
          imageUrl: cover,
          title: title,
          description,
          source,
          year,
        })
      )
    )
  )

module.exports = render
