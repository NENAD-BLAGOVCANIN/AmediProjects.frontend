import React from 'react';
import Timeline from 'react-visjs-timeline';
import { useTranslation } from 'react-i18next';

function TasksTimeline({ tasks }) {

  const options = {
    width: '100%',
    height: '70vh',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    type: 'background',
    margin: { axis: 15 },
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    }
  };

  const groups = [
    {
      id: 1,
      content: 'TODO',
    },
    {
      id: 2,
      content: 'Doing',
    },
    {
      id: 3,
      content: 'On Hold',
    },
    {
      id: 4,
      content: 'Done',
    }
  ];

  // Generate random items with random groups and colors
  const items = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    start: new Date(2024, 3, Math.floor(Math.random() * 28) + 1), // Random day in April 2024
    end: new Date(2024, 3, Math.floor(Math.random() * 28) + 1), // Random day in April 2024
    content: `Task ${index + 1}`,
    group: Math.floor(Math.random() * groups.length) + 1, // Random group ID
    className: `group-${Math.floor(Math.random() * groups.length) + 1}` // Assign a class based on group for custom styling
  }));

  // Define colors for each group
  const groupColors = {
    1: '#FF5733', // TODO: Orange
    2: '#5DADE2', // Doing: Blue
    3: '#F4D03F', // On Hold: Yellow
    4: '#58D68D', // Done: Green
  };

  return (
    <div>
      <Timeline 
        options={options} 
        items={items} 
        groups={groups}
        itemClassNameProvider={(item) => item.className} // Use className from item for styling
        itemStyle={(item, index) => ({ backgroundColor: groupColors[item.group] })} // Set color based on group
      />
    </div>
  );
}

export default TasksTimeline;
