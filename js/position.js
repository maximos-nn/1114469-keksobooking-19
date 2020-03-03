'use strict';

(function () {
  function PositionConstraints(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  function PositionShift(x, y) {
    this.x = x;
    this.y = y;
  }

  function Position(x, y, constraints) {
    if (constraints && !(constraints instanceof PositionConstraints)) {
      throw new Error('Неверно заданы ограничения позиции.');
    }
    this._constraints = constraints;
    this.setX(x);
    this.setY(y);
  }

  Position.prototype.setX = function (x) {
    this.x = x;
    if (!this._constraints) {
      return;
    }
    if (x < this._constraints.left) {
      this.x = this._constraints.left;
    }
    if (x > this._constraints.right) {
      this.x = this._constraints.right;
    }
  };

  Position.prototype.setY = function (y) {
    this.y = y;
    if (!this._constraints) {
      return;
    }
    if (y < this._constraints.top) {
      this.y = this._constraints.top;
    }
    if (y > this._constraints.bottom) {
      this.y = this._constraints.bottom;
    }
  };

  Position.prototype.getShift = function (newPosition) {
    if (newPosition && !(newPosition instanceof Position)) {
      throw new Error('Неверный тип новой позиции.');
    }
    return new PositionShift(newPosition.x - this.x, newPosition.y - this.y);
  };

  window.position = {
    Position: Position,
    PositionConstraints: PositionConstraints,
    PositionShift: PositionShift
  };
})();
