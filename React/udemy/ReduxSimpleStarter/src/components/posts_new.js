import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createPost } from '../actions/index'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const renderField = ({
  input,
  textarea,
  label,
  type,
  meta: { touched, invalid, error }
}) => (
  <div>
    {
      input && <input {...input} placeholder={label} type={type} className={`form-control ${touched && invalid ? 'is-invalid' : ''}`} />
    }
    {
      textarea && <textarea {...textarea} type={type} className={`form-control ${touched && invalid ? 'is-invalid' : ''}`} />
    }
    {
      touched && (error && <div className="text-danger">{error}</div>)
    }
  </div>
)

class PostsNew extends React.Component {
  onSubmit = (data) => {
    return this.props.createPost(data)
      .then(() => {
        this.props.history.push("/")
      })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create A New Post</h3>
        <div className="form-group">
          <label>Title</label>
          <Field
            name="title"
            component={renderField}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Categories</label>
          <Field
            name="categories"
            component={renderField}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <Field
            name="content"
            component={renderField}
            type="textarea"
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Enter a UserName'
  } 

  if (!values.categories) {
    errors.categories = 'Enter Categories'
  } 

  if (!values.content) {
    errors.content = 'Enter Some Content'
  } 
  
  return errors
}

export default connect(null, { createPost })(reduxForm({
  form: 'PostsNewForm',
  validate,
})(PostsNew))