import React, { Component } from 'react';
import './slideshow.css';
import classNames from 'classnames';


class CitiesSlider extends Component {
  state = {
    IMAGE_PARTS: 4,
    changeTO: null,
    AUTOCHANGE_TIME: 4000,
    activeSlide: -1,
    prevSlide: -1,
    sliderReady: false,
  }

  componentWillUnmount() {
    // window.clearTimeout(this.changeTO);
  }
  componentDidMount(){
         this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO = () => {
    this.setState.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.state.AUTOCHANGE_TIME);
  }

  changeSlides = (change) => {
    // window.clearTimeout(this.state.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
   
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })}>
        
        <div className="slider__slides">
          {this.props.slides.map((slide, index) => (
            <div
              className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index })}
              key={slide.id}
            ><p className="slider__top-heading">{slide.Album}</p>
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">{slide.title || slide.caption}</h3>
                <h2 className="slider__slide-heading">
                  {slide.caption.split('').map(l => <span>{l}</span>)}
                </h2>
                <p className="slider__slide-readmore">read more</p>
              </div>
              <div className="slider__slide-parts">
                {[...Array(this.state.IMAGE_PARTS).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={slide.i}>
                    <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.Url})` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => this.changeSlides(-1)} />
        <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
      </div>
    );
  }
}


export default CitiesSlider;


