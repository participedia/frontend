import React from 'react' // eslint-disable-line no-unused-vars 
import AccordionTab from './components/AccordionTab'
import './About.css'

class About extends React.Component {

  render () {
    return (
      <div className="about more-orange">
        <h1>{"How do I search for content?"}</h1>
        <h2>Search Bar</h2>
        <div className="text">Type any combination of keywords into the search bar found at the top of any page. Content types searched include cases, methods, organizations, users, surveys, datasets and teaching tools. Your results will be displayed on the homepage.</div>
        <img src="/img/pp-search-help.png" alt="" className="article-image" />
        <img src="/img/pp-search-help-2.png" alt="" className="article-image" />
        <h2>Homepage Bar</h2>
        <div className="text">The homepage provides an interactive search tool for easy access to the content that Participedia has to offer. By default, the homepage search results section displays a curated set of featured content. Explore the map to find content by location. Once your search results are displayed, sort the results by content type, then further filter your results by the criteria displayed for each type.</div>
        <div className="accordion">
          <AccordionTab title="Interactive Map">
            <div className="content">
              <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat illum magni pariatur nulla voluptates magnam sint possimus, suscipit eum odit culpa, temporibus! Tenetur at iure, sit perferendis facilis, quis. Animi beatae optio eveniet quos soluta similique atque, dicta necessitatibus ullam debitis quia molestias expedita praesentium labore itaque delectus, temporibus quibusdam, perspiciatis velit sed.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Search by Content Type">
            <div className="content">
              <p className="text">Doloremque aliquam. Ad vero doloribus eos dolorem harum sed optio laboriosam iure saepe hic beatae eaque non doloremque id repellat, earum quia maxime aut tempora culpa sapiente ducimus dolorum. Ab, sit ad commodi quos amet optio expedita. Fuga voluptatum nisi dolor eos quo quasi similique voluptas architecto sunt vel totam sit.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="View Search Results">
            <div className="content">
              <p className="text">Itaque, quam aliquam molestiae officia facere, at sapiente deleniti labore esse odit iure voluptate perferendis! Quasi numquam quibusdam excepturi iusto, expedita quas nostrum, debitis ex quod veniam aliquid nulla a et, ab ducimus reprehenderit quaerat. Velit commodi cumque temporibus minus laboriosam, quidem recusandae est blanditiis repudiandae veniam sit sed, porro quod corporis illo. At, ab? Alias similique, optio maxime.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Filter Search Results">
            <div className="content">
              <p className="text">Maiores dolorem placeat eligendi, doloremque impedit mollitia nihil, consequuntur libero aspernatur debitis omnis modi sequi non inventore voluptates? Laudantium nihil tempore veritatis natus ipsa doloribus animi distinctio ducimus beatae ut aliquam ipsum blanditiis, quibusdam magnam possimus optio ea nulla ratione maxime eligendi cupiditate soluta omnis nobis. Dolorem earum amet at nesciunt autem consectetur quo eius assumenda quis omnis similique laborum, molestias, odit atque deleniti corporis, perspiciatis beatae repudiandae! Ea nobis, nesciunt commodi molestias iste nam eligendi ipsum, error sed eveniet architecto.</p>
            </div>
          </AccordionTab>
          <AccordionTab title="Download Search Results">
            <div className="content">
              <p className="text">Laudantium! Vero pariatur excepturi error culpa deserunt quasi, eveniet enim, reprehenderit et quos dolore nihil nulla. Harum, mollitia. Maxime officiis voluptas culpa sed veritatis doloremque a laudantium iusto reiciendis molestiae accusamus, aliquid ea eaque dolore, numquam eius commodi sequi aperiam magni quia pariatur. Quisquam aliquid facere nihil delectus minus. Facere sunt voluptas quo deleniti voluptatum adipisci, nesciunt quidem! Iure culpa saepe laborum hic alias sequi placeat distinctio aliquam magni ipsam quae obcaecati labore, enim ut, et deserunt debitis. Nihil excepturi asperiores similique blanditiis corrupti adipisci, quae quos, natus velit dolorum veniam, obcaecati ullam libero doloremque vero!</p>
            </div>
          </AccordionTab>
        </div>
      </div>
    )
  }
}

export default About
