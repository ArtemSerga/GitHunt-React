import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import * as cheerio from 'cheerio'
import request from 'request'
import { editInsertion } from '../../actions/insertions'
import { DEFAULT_INSERTIONS } from '../../redux/insertions'
import InputGroup from 'react-bootstrap/lib/InputGroup'
import { updateSource } from '../../actions/source'
import { sortAds } from '../../actions/targetToAdIds'


// import s from './Source.css'
const s = {Source: 'Source'}

const getParam = ($, result) => {
  let $params = $(".b-product-attributes__bg-title:contains('Производитель')")
  if ($params.length) {
    return (
      $params
        .parents('.b-product-attributes__row')
        .find('.b-product-attributes__value')
        .text()
        .trim()
    )
  }
}


class Source extends Component {
  input = ''

  componentDidMount() {
    this.input.focus();
  }

  handleSubmit(event) {
    event.preventDefault()
    let url = this.input.value;
    const options = {
      url: `http://cors.io?${url}`,
      withCredentials: false,
    }
    var result = {}

    request(
      options,
      (err, res, body) => {
        let $ = cheerio.load(body, {xmlMode: false})
        let title = $('title').text()
        let image = $('.b-image-holder__img').attr('src')
        this.props.dispatch(updateSource(url, title, image))
        result['MODEL'] = $('.b-product__name').text().trim()
        result['PRICE'] = (
          $('.b-product__price')
            .text()
            .replace('.', '')
            .replace(/,\d+/g, '')
            .trim()
        )
        result['PRICE_OLD'] = (
          $('.b-product__old-price')
            .text()
            .replace('.', '')
            .replace(/,\d+/g, '')
            .trim()
        )

        result['BRAND'] = getParam($, 'Производитель', result)
        if (result['BRAND'] && result.MODEL.search(result.BRAND) != -1) {
          [ result['CATEGORY'], result['MODEL'] ] = result.MODEL.split(result.BRAND)
        }

        result['COUNTRY'] = getParam($, 'Страна производитель', result)

        result['DISCOUNT'] = $('.b-product__discount-value').text().replace('Со скидкой ', '').trim()

        for (let name in DEFAULT_INSERTIONS) {
          let value = result[name] ? result[name].replace(/\s+/g, ' ').trim() : ''
          this.props.dispatch(editInsertion(name, value))

          let activeTargets = []
          for (let tid in this.props.targets) {
            let target = this.props.targets[tid]
            if (this.props.active.targetIds.indexOf(target.id) != -1) {
              activeTargets.push(target)
            }
          }
          this.props.dispatch(sortAds(activeTargets, this.props.ads, this.props.insertions))
        }

      }
    )
  }

  render() {
    return (
      <div className={s.Source}>
        <form onSubmit={ e => this.handleSubmit(e) }>
          <InputGroup>
            <input /*FormControl*/
              type="text"
              placeholder="URL товара на портале Prom.ua"
              ref={ref => this.input = ref}
            />
            {/*<InputGroup.Button>*/}
              {/*<Button type="submit">Go</Button>*/}
            {/*</InputGroup.Button>*/}
          </InputGroup>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  source: state.source,
  targets: state.targets,
  insertions: state.insertions,
  active: state.active,
  ads: state.ads,
})


export default connect(mapStateToProps)(Source)
