import { Star, StarHalf } from 'phosphor-react';

const StarRating = ({ qtdAvaliacoes }) => {
  let numeroAvaliacoes = 0;

  if (qtdAvaliacoes !== undefined) {
    numeroAvaliacoes = parseFloat(qtdAvaliacoes.replace(/,/g, ''));
  }

  return (
    <>
      {numeroAvaliacoes >= 0.5 && numeroAvaliacoes < 1 ? (
        <StarHalf size={20} weight="fill" className="text-primaryColor_2" />
      ) : (
        <Star
          size={20}
          className="text-primaryColor_2"
          weight={numeroAvaliacoes >= 1 ? 'fill' : 'regular'}
        />
      )}

      {numeroAvaliacoes >= 1.5 && numeroAvaliacoes < 2 ? (
        <StarHalf size={20} weight="fill" className="text-primaryColor_2" />
      ) : (
        <Star
          size={20}
          className="text-primaryColor_2"
          weight={numeroAvaliacoes >= 2 ? 'fill' : 'regular'}
        />
      )}

      {numeroAvaliacoes >= 2.5 && numeroAvaliacoes < 3 ? (
        <StarHalf size={20} weight="fill" className="text-primaryColor_2" />
      ) : (
        <Star
          size={20}
          className="text-primaryColor_2"
          weight={numeroAvaliacoes >= 3 ? 'fill' : 'regular'}
        />
      )}

      {numeroAvaliacoes >= 3.5 && numeroAvaliacoes < 4 ? (
        <StarHalf size={20} weight="fill" className="text-primaryColor_2" />
      ) : (
        <Star
          size={20}
          className="text-primaryColor_2"
          weight={numeroAvaliacoes >= 4 ? 'fill' : 'regular'}
        />
      )}

      {numeroAvaliacoes >= 4.5 && numeroAvaliacoes < 5 ? (
        <StarHalf size={20} weight="fill" className="text-primaryColor_2" />
      ) : (
        <Star
          size={20}
          className="text-primaryColor_2"
          weight={numeroAvaliacoes == 5 ? 'fill' : 'regular'}
        />
      )}
    </>
  );
};

export default StarRating;
