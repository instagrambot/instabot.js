import React, { Component } from 'react';
import Types from 'prop-types';
import cn from 'classnames';
import { noop } from 'lodash';
import { Formik } from 'formik';
import Yup from 'yup';
import Flip from '@/components/Flip';
import Control from '@/components/Control';

export default class AccountsCreate extends Component {
  static propTypes = {
    onBack: Types.func,
  }

  static defaultProps = {
    onBack: noop,
  }

  state = {
    isLoading: false,
  }

  schema = Yup.object().shape({
    login: Yup.string().required('*'),
    password: Yup.string().required('*'),
  })

  handleSubmit = () => {
    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const { onBack } = this.props;
    const { isLoading } = this.state;
    const { handleSubmit, schema } = this;

    return (
      <Flip
        className="b-accounts__create"
        label="Add account"
        onLabelClick={onBack}
      >
        <Formik onSubmit={handleSubmit} validationSchema={schema}>
          {f => (
            <form className="b-form" onSubmit={f.handleSubmit}>
              <div className="b-form__alert b-form__alert--error">
                Wrong login or password.
              </div>

              <div className="b-form__body">
                <Control
                  name="login"
                  value={f.values.login}
                  onBlur={f.handleBlur}
                  onChange={f.handleChange}
                  error={f.touched.login && f.errors.login}
                />

                <Control
                  name="password"
                  type="password"
                  value={f.values.password}
                  onBlur={f.handleBlur}
                  onChange={f.handleChange}
                  error={f.touched.password && f.errors.password}
                />
              </div>

              <div className="b-form__footer">
                <button
                  disabled={isLoading || !f.isValid}
                  className={cn('b-btn b-btn--block', { 'b-btn--loading': isLoading })}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Flip>
    );
  }
}
