const db = require('../config/database');

const DailyLog = {
  // Create a new daily log entry
  create: (data, callback) => {
    const { user_id, date, meal_type, notes, food_items } = data;
    
    // Insert into daily_logs table
    db.query(
      'INSERT INTO daily_logs (user_id, date, meal_type, notes) VALUES (?, ?, ?, ?)',
      [user_id, date, meal_type, notes],
      (err, result) => {
        if (err) return callback(err);

        const daily_log_id = result.insertId;
        
        // Insert food items into daily_log_foods table
        if (food_items && Array.isArray(food_items)) {
          const foodValues = food_items.map(item => [daily_log_id, item.food_id, item.quantity]);

          db.query(
            'INSERT INTO daily_log_foods (daily_log_id, food_id, quantity) VALUES ?',
            [foodValues],
            (err, result) => {
              if (err) return callback(err);
              callback(null, { insertId: daily_log_id });
            }
          );
        } else {
          callback(null, { insertId: daily_log_id });
        }
      }
    );
  },

  // Get all daily logs with food details
  getAll: (callback) => {
    db.query(
      `SELECT dl.*, u.username, 
              f.name AS food_name,
              dlf.id AS daily_logs_foods_id,
              dlf.quantity 
       FROM daily_logs dl
       JOIN users u ON dl.user_id = u.id
       LEFT JOIN daily_log_foods dlf ON dl.id = dlf.daily_log_id
       LEFT JOIN foods f ON dlf.food_id = f.id`,
      (err, results) => {
        if (err) return callback(err);
  
        // Group results by daily_log_id and format food items
        const logs = [];
        results.forEach(row => {
          const log = logs.find(log => log.id === row.id);
          if (!log) {
            // Create a new log entry if it doesn't exist
            logs.push({
              id: row.id,
              user_id: row.user_id,
              date: row.date,
              meal_type: row.meal_type,
              notes: row.notes,
              username: row.username,
              foodLogsId:row.daily_logs_foods_id,
              foodItems: [{
               
                name: row.food_name,
                quantity: row.quantity,
              }],
            });
          } else {
            // If log entry exists, add food item to the foodItems array
            log.foodItems.push({
              name: row.food_name,
              quantity: row.quantity,
            });
          }
        });
  
        callback(null, logs);
      }
    );
  },
  
  // Get daily log by ID with food details
  getById: (id, callback) => {
    db.query(
      `SELECT dl.*, dlf.* , u.username, 
              f.name AS food_name
             
       FROM daily_logs dl
       JOIN users u ON dl.user_id = u.id
       LEFT JOIN daily_log_foods dlf ON dl.id = dlf.daily_log_id
       LEFT JOIN foods f ON dlf.food_id = f.id
       WHERE dl.id = ?`,
      [id],
      (err, results) => {
        if (err) return callback(err);
  
        // Format the results into the desired structure
        if (results.length === 0) return callback(null, null);
  
        const log = {
          id: results[0].id,
          user_id: results[0].user_id,
          date: results[0].date,
          meal_type: results[0].meal_type,
          notes: results[0].notes,
          username: results[0].username,
          foodItems: results.map(row => ({
            name: row.food_name,
            quantity: row.quantity,
          })),
        };
  
        callback(null, log);
      }
    );
  },
  
  // Update a daily log by ID
  updateById: (id, data, callback) => {
    const { user_id, date, meal_type, notes, food_items } = data;

    db.query(
      `UPDATE daily_logs SET user_id = ?, date = ?, meal_type = ?, notes = ? WHERE id = ?`,
      [user_id, date, meal_type, notes, id],
      (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) return callback(new Error('Daily log not found'));

        // Delete old food items
        db.query('DELETE FROM daily_log_foods WHERE daily_log_id = ?', [id], (err) => {
          if (err) return callback(err);

          // Insert new food items
          if (food_items && Array.isArray(food_items)) {
            const foodValues = food_items.map(item => [id, item.food_id, item.quantity]);

            db.query(
              'INSERT INTO daily_log_foods (daily_log_id, food_id, quantity) VALUES ?',
              [foodValues],
              (err, result) => {
                if (err) return callback(err);
                callback(null, { message: 'Daily log updated successfully' });
              }
            );
          } else {
            callback(null, { message: 'Daily log updated successfully' });
          }
        });
      }
    );
  },

  // Delete a daily log by ID
  deleteById: (id, callback) => {
    // Delete food items from daily_log_foods table
    db.query('DELETE FROM daily_log_foods WHERE daily_log_id = ?', [id], (err, result) => {
      if (err) return callback(err);

      // Now delete the daily log from daily_logs table
      db.query('DELETE FROM daily_logs WHERE id = ?', [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      });
    });
  },

  // Delete a single food item from a daily log
  deleteFoodItem: (dailyLogId, foodId, callback) => {
    db.query(
      'DELETE FROM daily_log_foods WHERE daily_log_id = ? AND food_id = ?',
      [dailyLogId, foodId],
      (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) return callback(new Error('Food item not found in this log'));
        callback(null, { message: 'Food item deleted successfully' });
      }
    );
  }
};

module.exports = DailyLog;
