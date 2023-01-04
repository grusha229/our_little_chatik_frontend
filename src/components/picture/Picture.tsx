export default function Picture (props) {

    return (
        <picture className={props.class} >
            <img
                src={props.src}
                alt={props.alt}
                style={
                {
                    height: '100%',
                    display: 'block',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '25%',
                } as any}
            />
        </picture>
    );
};
