import React, { Component } from 'react';
import Types from 'prop-types';
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

  onSubmit = (e) => {
    console.log('onSubmit', e);
  }

  schema = Yup.object().shape({
    account: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })

  render() {
    const { onBack } = this.props;
    const { onSubmit, schema } = this;

    return (
      <Flip
        className="b-accounts-create"
        label="Add account"
        onLabelClick={onBack}
      >
        <Formik onSubmit={onSubmit} validationSchema={schema}>
          {f => (
            <form className="b-accounts-create__form" onSubmit={f.handleSubmit}>
              <div className="b-accounts-create__body">
                <Control
                  name="account"
                  value={f.values.account}
                  onBlur={f.handleBlur}
                  onChange={f.handleChange}
                  error={f.touched.account && f.errors.account}
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

              <div className="b-accounts-create__footer">
                <button className="b-btn b-btn--block">Submit</button>
              </div>
            </form>
          )}
        </Formik>
      </Flip>
    );
  }
}
