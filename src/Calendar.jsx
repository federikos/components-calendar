import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import nanoid from 'nanoid';

const Calendar = ({date}) => {
  //форматируем строки для рендеринга
  const nowDateName = moment(date).format('dddd');
  const nowDateNumber = moment(date).format('D');
  const nowDateMonthWithDeclension = moment(date).format('D MMMM').split(' ')[1];
  const nowDateMonth = moment(date).format('MMMM');
  const nowDateYear = moment(date).format('YYYY');
  //определяем первую видимую дату
  const firstVisibleDay = moment(date).startOf('month').startOf('week');
  let visibleDates = [];
  //создаем массив видимых дат по модели {date: 8, isOtherMonth: false, isCurrentDate: false}
  for (let i = 0; i < 7 * 5; i++) {
    const currentDate = firstVisibleDay.clone().add(i, 'day');
    visibleDates.push({
      date: currentDate.date(),
      isOtherMonth: currentDate.format('MMMM') !== nowDateMonth,
      isCurrentDate: currentDate.format('D MMMM') === moment(date).format('D MMMM')
    })
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{nowDateName}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{nowDateNumber}</div>
          <div className="ui-datepicker-material-month">{nowDateMonthWithDeclension}</div>
          <div className="ui-datepicker-material-year">{nowDateYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{nowDateMonth}</span>&nbsp;<span className="ui-datepicker-year">{nowDateYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {
            new Array(5).fill(0).map((week, i) => (
              <tr key={nanoid()}>
                  {
                    visibleDates.slice(i * 7, i * 7 + 7)
                      .map((day, i) => (
                        <td 
                          key={nanoid()} 
                          className={day.isOtherMonth ? 'ui-datepicker-other-month' : day.isCurrentDate ? 'ui-datepicker-today': null}>
                            {day.date}
                        </td>
                      ))
                  }
              </tr>)
            )
          }
        </tbody>
      </table>
    </div>
  )
}

Calendar.propTypes = {
  date: PropTypes.object.isRequired,
}

export default Calendar;