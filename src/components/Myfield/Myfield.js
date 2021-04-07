import React from 'react';
import { useField, useFormikContext } from 'formik';

const MyField = (props) => {
    const {
        values: { name, email },
        touched,
        setFieldValue,
    } = useFormikContext();

    const [field] = useField(props);

    React.useEffect(() => {
        console.log(name, email)
        // set the value of textC, based on textA and textB
        if (
            name.trim() !== '' &&
            email.trim() !== '' &&
            touched.name &&
            touched.email
        ) {
            setFieldValue(props.name, `${name}, ${email}`);
        }
    }, [email, name, touched.name, touched.email, setFieldValue, props.name]);


    if (
        name.trim() !== '' &&
        email.trim() !== '' &&
        touched.name &&
        touched.email
    ) {
        return <input { ...props } { ...field } />
    } else {
        return <input { ...props } />
    }

};

export default MyField;