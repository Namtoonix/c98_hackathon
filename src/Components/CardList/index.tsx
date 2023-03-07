import "./styles.scss";
// import image from "../../assets/images/shibainu.jpeg";
import CardProject from "../CardProject";
import Slider from "react-slick";

// const PROJECTS_DEFAULT = Array(4).fill({
//   image: image,
//   title: "Fushionist",
//   description:
//     "'Fusionist is a scalable and sustainable Sci-Fi universe with a combination of sophisticated game design and deflationary token mechanics. You can command your Bi·Mech in PvP, PvE, and even E-Sports tournaments in Fusionst to earn tokens and other NFT rewards. This NFT collection will have an exclusive coating style - Supreme Dominance, superior attributes, and a higher chance of receiving new weapons when upgrading to become more badass which can be used in Fusionist",
//   value: 150000,
//   quantity: 12,
// });

function CardList(cards: any) {
  const renderProjects = () => {
    return cards?.cards?.map((item: any, index : number) => (
      <CardProject data={item} key={index} />
    ));
  };

  const MySlider: any = Slider;

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    centerPadding: "10px",
  };

  return <MySlider {...settings}>{renderProjects()}</MySlider>;
}

export default CardList;
