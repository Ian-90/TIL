import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createPost } from '../actions/index'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post',
  },
  categories: {
    type: 'input',
    label: 'Enter some categories for this post',
  },
  content: {
    type: 'textarea',
    label: 'Post Contents',
  }
}

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

class PostsNewRefactor extends React.Component {
  onSubmit = (data) => {
    return this.props.createPost(data)
      .then(() => {
        this.props.history.push("/")
      })
  }

  renderEachField = (fieldConfig, field) => {
    return (
      <div className="form-group" key={field}>
        <label>{fieldConfig.label}</label>
        <Field
          name={field}
          component={renderField}
          type={fieldConfig.type}
        />
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderEachField)}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`
    }
  })

  return errors
}

// fields : _.key(FIELDS)

export default connect(null, { createPost })(reduxForm({
  form: 'PostsNewForm',
  validate,
})(PostsNewRefactor))