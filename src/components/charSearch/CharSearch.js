import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useMarvelServices from "../../services/MarvelServices";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./charSearch.scss"

const CharSearch = ()=>{
    const [charData, setCharData] = useState({});
    
    const {getCharacterByName} = useMarvelServices();

    const handleSearch = async (name, setFieldError) => {
        try {
            const data = await getCharacterByName(name);
            setCharData(data);
        } catch {
            setCharData({});
            setFieldError("name", "The character was not found. Check the name and try again.");
        }
    };
    
    return (
        <Formik
            initialValues = {{
                name: "",
                notFound: false
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                    .min(2)
                    .required("Required field")
            })}
            onSubmit={(values, { setFieldError }) => {
                handleSearch(values.name, setFieldError);
            }}

        >
            <Form className="form char__info">
                <label htmlFor="name"><strong>Or find character by name:</strong></label>
                <div className="input-container">
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter character name"
                    />
                    <button type="submit" className="button button__main">
                        <div className="inner">
                            Find
                        </div>
                    </button>
                </div>
                <ErrorMessage component="div" className="error" name="name"/>
                {charData.name ? 
                    <div className="response-container">
                        <p>There is! Visit {charData.name} page?</p>
                        <Link to={`/${charData.name}`} className="button button__secondary">
                            <div className="inner">
                                To page
                            </div>
                        </Link>
                    </div>
                    : null
                }
            </Form>
        </Formik>
    )
}

export default CharSearch;