import axios from 'axios';
import React, { Component } from 'react';
import FilterButton from '../../components/UI/ButtonsFilter/filterButton';
import Slideshow from '../../components/UI/slideshow/Slideshow';
import './home.css';
import AOS from "aos";
import "aos/dist/aos.css";

class Home extends Component {
    state = {
        posts: [],
        AlbumName: [],
        Selected: [],
    }
    componentDidMount() {
        axios.get('https://blog-3dcd5-default-rtdb.firebaseio.com/posts.json')
            .then(res => {
                

                const fetched = [];
                for (let key in res.data)
                    fetched.push(
                        {
                            ...res.data[key],
                            id: key
                        }
                    )
                    console.log(fetched);
                this.setState({ posts: fetched });

                const uniqueArr = [];
                fetched.forEach((item) => {
                    if (!uniqueArr.includes(item.Album)) {
                        uniqueArr.push(item.Album);
                    }
                })
                this.setState({ AlbumName: uniqueArr });
            
                
                const ablumsWithIdsLessThan3 = fetched.reverse().filter(
                    ({ id }) => id === fetched[0].id
                )
                
                this.setState({ Selected: ablumsWithIdsLessThan3 });

                console.log("thid is ", ablumsWithIdsLessThan3);
            })
            .catch(err => {
                console.log(err);
            })
        AOS.init({
            duration: 1200,
        })

    }
    HandlerFilter = (event) => {
        console.log(event);
        const SelectedAlbum = (this.state.posts).filter(
            ({ Album }) => Album === event
        )
        this.setState({ Selected: SelectedAlbum });
        // console.log('this is ', this.state.Selected);
    }
    render() {
        // splitScroll();
        return (
            <div className="Blog">
                <section id="Home" className="Home" >
                    <div class="text">
                        <h2> Welcome to </h2>
                        <h3>Ajay</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                            changes in 1 navbar with transparent and color when scroll
                            2 about with small cards
                            3 buttons with li or as same as navbar tags
                            4 small slide show imgaes // optional
                            5 try to mske all files AOS
                            6 footers has to changed</p>
                    </div>
                </section>
                <section id="About" className="about">
                    <div className="about-title" data-aos="fade-right" >
                        <img class="blog-img" src="https://d1w7gvu0kpf6fl.cloudfront.net/img/category/images/128-category-image.jpg"
                            alt="NEw IMages" />
                    </div>
                    <div className="about-pages" data-aos="fade-left">
                        <div>
                            <h2> About Me</h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit amet venenatis urna cursus. Vestibulum lectus mauris ultrices eros in. Risus at ultrices mi tempus imperdiet nulla.</p>
                        </div>
                    </div>
                </section>
                <section id="Work">
                </section>
                <section className="AlbumsSLide">
                    <Slideshow key={this.state.Selected} slides={this.state.Selected} />
                    {/* data={this.state.Selected}
                        <div className="slide-containers">
                        <Slide>
                            {this.state.Selected.map(order => (
                                <div className="each-fade">
                                    <div className="image-container">
                                        <img src={order.Url} />
                                    </div>
                                    <p>{order.caption}</p>
                                </div>
                            ))}
                        </Slide>
                    </div>
                         {this.state.Selected.map(order => (
                        <div className="mySlides fade">
                            <img src={order.Url} alt="new image" />
                        </div>
                            ))}
                         {this.state.Selected.map(order => (
                            <Slideshow url={order.Url}/>
                        ))}
                        {this.state.Selected.map(order => (
                            <div className="mySlides fade">
                                <img src={order.Url} alt="new image" />
                                
                            </div>
                        ))}
                    <div className="gall">
                    <div className="galls">
                        <img className="align-right slide-in" src="https://i.pinimg.com/originals/41/92/82/4192825a9e4cc77cbf1223b0f1aad033.jpg" alt="new image" />
                    </div>
                    
                    <div className="galls">
                        <img src="https://i.pinimg.com/originals/41/92/82/4192825a9e4cc77cbf1223b0f1aad033.jpg" />
                    </div>
            </div>*/}
                    <div className="BtnContainer">
                        {this.state.AlbumName.reverse().slice(0, 5).map(order => (
                            <FilterButton key={order}
                                clicked={() => this.HandlerFilter(order)}
                                Btnname={order} />
                        ))}
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;