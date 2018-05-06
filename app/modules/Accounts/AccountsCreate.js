import React, { Component, Fragment } from 'react';
import Types from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { noop, get } from 'lodash';
import { Formik } from 'formik';
import Yup from 'yup';

import { openExternal } from '@/lib/utils';
import WebApi from '@/lib/web-api';
import Flip from '@/components/Flip';
import Control from '@/components/Control';

const CHECKPOINT_REQUIRED = 'checkpoint_required';

const AccountsCreate = class extends Component {
  static displayName = 'AccountsCreate'

  static propTypes = {
    onBack: Types.func,
  }

  static defaultProps = {
    onBack: noop,
  }

  state = {
    error: null,
    isLoading: false,
  }

  api = new WebApi()

  schema = Yup.object().shape({
    login: Yup.string().required('*'),
    password: Yup.string().required('*'),
  })

  handleSubmit = ({ login, password }) => {
    this.setState({ isLoading: true, error: null });

    const request = this.api.login(login, password);

    request.then(response => this.handleResponse({ login, response }));
    request.catch(this.handleError);
  }

  handleResponse = async ({ response }) => {
    if (response.authenticated) {
      this.setState({ isLoading: false });
      return;

      // const account = await this.api.account(login);
    }

    this.setState({ error: 'Wrong login or password', isLoading: false });
  }

  handleError = (err) => {
    const checkpointUrl = get(err, 'response.body.checkpoint_url');
    const checkpointRequired = err.message === CHECKPOINT_REQUIRED;

    if (checkpointRequired && checkpointUrl) {
      this.setState({
        error: this.renderCheckpoint(checkpointUrl),
        isLoading: false,
      });

      return;
    }

    this.setState({
      error: err.message,
      isLoading: false,
    });
  }

  renderCheckpoint = url => (
    <Fragment>
      <a href={`https://instagram.com${url}`} onClick={openExternal}>
        Instagram: checkpoint required<br />
      </a>
    </Fragment>
  )

  render() {
    const { onBack } = this.props;
    const { isLoading, error } = this.state;
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
              {error && (
                <div className="b-form__alert b-form__alert--error">{ error }</div>
              )}

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
};

export default connect()(AccountsCreate);
