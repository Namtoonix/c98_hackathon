import { formatNumberView } from "../../hooks";
import "./styles.scss";

function CardProject(props: any) {
  const { data } = props;
  return (
    <article className="team-card">
      <div className="team-card__img-box">
        <img
          className="team-card__img"
          src={data.image}
          alt="Close-Up Photography of Giraffe"
        />
      </div>
      <div className="team-card__content">
        <hgroup className="team-card__intro">
          <h3 className="team-card__title">{data.title}</h3>
        </hgroup>
        <p className="team-card__desc">{data.description}</p>
        <p className="team-card__mail">
          Values: <span>{formatNumberView(data.value)} C98</span>
        </p>
        <p className="team-card__mail">
          Max Number: <span>{formatNumberView(data.quantity)}</span>
        </p>
        <button className="team-card__btn primary-btn">Vote</button>
      </div>
    </article>
  );
}

export default CardProject;
