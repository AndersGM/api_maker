import {CanCanLoader} from "@kaspernj/api-maker";
import {digs} from "@kaspernj/object-digger"

export default class CanCanWithState extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }

  state = {
    canCan: undefined
  }

  render() {
    const {className} = this.props
    const {canCan} = digs(this.state, "canCan")

    return (
      <div className={classNames("components-can-can-loader-with-state", className)}>
        <CanCanLoader abilities={[[Account, ["sum"]]]} component={this} />

        {canCan && canCan.can("sum", Account) &&
          <div className="can-access-admin">
            can access admin
          </div>
        }
        {canCan && !canCan.can("sum", Account) &&
          <div className="cannot-access-admin">
            can not access admin
          </div>
        }
      </div>
    )
  }
}
